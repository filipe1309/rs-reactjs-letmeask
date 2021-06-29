import '../styles/room.scss';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import Modal from 'react-modal';
import { useState, Fragment } from 'react';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } =  useRoom(roomId);
    const history = useHistory();
    const [ questionIdModalOpen, setQuestionIdModalOpen ] = useState<string | undefined>();

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Are you sure you want to delete?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCloseRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date()
        });

        history.push('/');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleCloseRoom}>Finish Room</Button>
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
                            <Fragment key={question.id}>
                                <Question
                                    content={question.content}
                                    author={question.author}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setQuestionIdModalOpen(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remove question" />
                                    </button>
                                </Question>
                                <Modal 
                                    isOpen={questionIdModalOpen === question.id}
                                    onRequestClose={() => setQuestionIdModalOpen(undefined)}
                                    className="modal"
                                    ariaHideApp={false}
                                >
                                    <div className="modal-buttons">
                                        <Button onClick={() => handleDeleteQuestion(question.id)}>Delete</Button>
                                        <Button onClick={() => setQuestionIdModalOpen(undefined)}>Cancel</Button>
                                    </div>
                                </Modal>
                            </Fragment>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};
