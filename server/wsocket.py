import asyncio
import json
import websockets

from collections import defaultdict

class PlayGame:
    """"""
    game_info = defaultdict(lambda: defaultdict(list))

    def create_game(self, game_id, ws,payload={}):
        """"""
        self.game_info[game_id]['ws'].append(ws)
        self.game_info[game_id]['game_status'] = 'open'
        self.game_info[game_id]['payload'] = payload
        
    def join_game(self, game_id, ws):
        """"""
        self.game_info[game_id]['ws'].append(ws)
        self.game_info[game_id]['game_status'] = 'goingon'
    
    def play(self, game_id,payload,ws):
        """"""
        self.game_info[game_id]['payload'] = payload
        
    def terminate_game(self, game_id):
        """"""
        del self.game_info[game_id]
        
        
obj = PlayGame()

def player(payload,payload_str,ws):
    """"""
    if payload['type'] == 'create':
        obj.create_game(payload['game_id'], ws)
    if payload['type'] == 'join':
        if payload['game_id'] not in obj.game_info:
            return {
                ws : "400"
            }         
        obj.join_game(payload['game_id'], ws)
    if payload['type'] ==  'play':
        obj.play(payload['game_id'],payload_str,ws)
    ret_ = {}
    for values in obj.game_info[payload['game_id']]['ws'] :
        ret_[values] = obj.game_info[payload['game_id']]['payload']
    print(obj.game_info)
    return ret_

async def play_online(websocket, path):
    while True:
        payload_str = await websocket.recv()
        payload = json.loads(payload_str)
        print(payload)
        data = player(payload,payload_str,websocket)        
        for key, value  in data.items():
            await key.send(value)
            await asyncio.sleep(0.00003)

if __name__ == "__main__":
    start_server = websockets.serve(play_online, "0.0.0.0", 1234)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()