import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={params.id}/>
                </div> 
            </header>

            <main>
                <div className="room-title">
                    <h1>React's Room</h1>
                    <span>4 questions</span>
                </div>

                <form>
                    <textarea
                        placeholder="What is your question?"
                    />
                    <div className="form-footer">
                        <span>To make a question, <button>login first</button>.</span>
                        <Button type="submit">Send question</Button>
                    </div>
                </form>
            </main>
        </div>
    );
};
