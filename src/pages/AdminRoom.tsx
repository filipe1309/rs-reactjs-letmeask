import '../styles/room.scss';
import { useAUth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const { user } = useAUth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [ newQuestion, setNewQuestion ] = useState('');
    const history = useHistory();
    const { questions, title } =  useRoom(roomId);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [ user, history ]);

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
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Finish Room</Button>
                    </div>
                </div> 
            </header>

            <main>
                <div className="room-title">
                    <h1>#Room {title}</h1>
                    { questions.length > 0 && (<span>{questions.length} question(s)</span>)}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>

            </main>
        </div>
    );
};
