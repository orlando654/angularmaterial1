import { Status } from "./gamestatus";

export class Gamelogic {
    gameField: Array<number> = [];
    currentTurn: number | undefined;
    gameStatus: Status;

    public constructor(){
        this.gameStatus= Status.STOP
        this.gameField= [0,0,0,0,0,0,0,0,0];
        
    }

    gameStart(): void{
        this.gameStatus = Status.STAR
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn);
        
        this.gameField= [0,0,0,0,0,0,0,0,0];
    }

    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() * 2) +1;
        return startPlayer;
    }

    setField(position: number, value: number): void{
        this.gameField[position]=value;
    }

    getPlayerColorClass() : string {
        const colorClass = (this.currentTurn === 2)? 'player-two' : 'player-one';
        return colorClass;

    }
}
