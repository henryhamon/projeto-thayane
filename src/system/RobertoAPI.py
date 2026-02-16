class RobertoHardware:
    def __init__(self):
        self.logs = []

    def mover(self):
        self.logs.append({'action': 'MOVE'})

    def virar_esquerda(self):
        self.logs.append({'action': 'TURN_LEFT'})

    def virar_direita(self):
        self.logs.append({'action': 'TURN_RIGHT'})

    def sensor(self):
        # Mock 'LIVRE' for MVP. 
        # In a real scenario, we might inject map data or call back to JS.
        return 'LIVRE'

    def escreva(self, msg):
        self.logs.append({'action': 'PRINT', 'message': str(msg)})
