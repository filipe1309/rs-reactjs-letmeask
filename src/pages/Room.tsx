import '../styles/room.scss';
import { useAUth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { RoomCode } from '../components/RoomCode';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAUth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [ newQuestion, setNewQuestion ] = useState('');

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            // TODO replace with toast (https://react-hot-toast.com/)
            throw new Error('You must be logged in.');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div> 
            </header>

            <main>
                <div className="room-title">
                    <h1>React's Room</h1>
                    <span>4 questions</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="What is your question?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>To make a question, <button>login first</button>.</span>
                        ) }
                        <Button type="submit" disabled={!user}>Send question</Button>
                    </div>
                </form>
            </main>
        </div>
    );
};
