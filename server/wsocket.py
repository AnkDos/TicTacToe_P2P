"""
Created By: Ankur Pandey
"""
import asyncio
import json
import websockets
import os
import copy

from collections import defaultdict

class PlayGame:
    """"""
    game_info = defaultdict(lambda: defaultdict(list))

    def create_game(self, game_id, ws,payload={}):
        """"""
        self.game_info[game_id]['ws'].append(ws)
        self.game_info[game_id]['game_status'] = 'open'
        self.game_info[game_id]['payload'] = payload
        self.game_info[game_id]['payload']['game_status'] = 'open'
        
    def join_game(self, game_id, ws,payload):
        """"""
        self.game_info[game_id]['ws'].append(ws)
        self.game_info[game_id]['game_status'] = 'goingon'
        self.game_info[game_id]['payload'] = payload
    
    def play(self, game_id,payload,ws):
        """"""
        self.game_info[game_id]['payload'] = payload
        
    def other_socket(self,game_id, ws):
        """"""
        return [wsk for wsk in self.game_info[game_id]['ws'] \
            if wsk != ws ][-1]
        
    def terminate_game(self, game_id):
        """"""
        del self.game_info[game_id]
    
    def terminate_game_ws(self,ws):
        """"""
        del_val = None
        ret_ = None
        for key, value in self.game_info.items():
            if ws in value['ws']:
                value['ws'].remove(ws)
                ret_ =  value['ws'][-1]
                del_val = key
        if del_val:
            del self.game_info[del_val]
        return ret_
        
obj = PlayGame()

def player(payload,payload_str,ws,terminate_ws=False):
    """"""
    if terminate_ws :
        ret_ = obj.terminate_game_ws(ws)
        return {
            ret_ : "500"
        }
    ret_ = {}
    turn = {}
    temp = dict()
    if payload['type'] == 'create':
        if payload['game_id'] in obj.game_info and \
            payload['event'] != 'recreate':
            return {
                ws : "700"
            }
        if payload['event'] == 'recreate' :
            ows = obj.other_socket(payload['game_id'],ws)
            obj.terminate_game(payload['game_id'])
            obj.create_game(payload['game_id'], ws)
            turn[ws] = 0
            temp = obj.game_info[payload['game_id']]['payload']
            temp['player'] = None
            return {
                ows: "900",
                ws: json.dumps(temp)
            }
            
        obj.create_game(payload['game_id'], ws)
        turn[ws] = 0
    
    if payload['type'] == 'join':
        if payload['game_id'] not in obj.game_info:
            if payload['event'] == 'rejoin':
                return {
                    ws: "800"
                }
            return {
                ws : "400"
            }
        if obj.game_info[payload['game_id']]['game_status'] == 'goingon' and\
            payload['event'] != 'rejoin':
            return {
                ws : "600"
            }
        if obj.game_info[payload['game_id']]['game_status'] == 'goingon' and\
            payload['event'] == 'rejoin':
            return {
                ws : "800"
            }      
        obj.join_game(payload['game_id'], ws,payload_str)
        turn[ws] = 0
        turn[obj.other_socket(payload['game_id'],ws)] = 1
    
    if payload['type'] ==  'play':
        obj.play(payload['game_id'],payload_str,ws)
        turn[ws] = 0
        turn[obj.other_socket(payload['game_id'],ws)] = 1
        
    
    for values in obj.game_info[payload['game_id']]['ws'] :
        ret_[values] = obj.game_info[payload['game_id']]['payload']
        if not turn[values]:
            temp = copy.deepcopy(obj.game_info[payload['game_id']]['payload'])
            if isinstance(temp,dict):
                temp['player'] = None
            else :
                temp = json.loads(temp)
                temp['player'] = None
            ret_[values] = json.dumps(temp)
    
    return ret_

async def play_online(websocket, path):
    """serving hot"""
    try :
        while True:
            payload_str = await websocket.recv()
            payload = json.loads(payload_str)
            data = player(payload,payload_str,websocket)        
            for key, value  in data.items():
                await key.send(value)
                await asyncio.sleep(0.003)
    except :
        data = player(payload=None,
                      payload_str=None,
                      ws=websocket,
                      terminate_ws=True)
        for key, value  in data.items():
                await key.send(value)
                await asyncio.sleep(0.00003)

if __name__ == "__main__":
    start_server = websockets.serve(play_online, "0.0.0.0", 1234)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
