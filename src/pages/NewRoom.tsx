import '../styles/auth.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAUth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

export function NewRoom() {
    const { user } = useAUth();
    const { theme } = useTheme();
    const history = useHistory();
    const [ newRoom, setNewRoom ] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="Ilustration of questions &amp; answers" />
                <strong>Create a Q&amp;A room on-live</strong>
                <p>Answer you audience in real-time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    {/* <h1>{user?.name}</h1> */}
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Room's name"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Create room</Button>
                    </form>
                    <p>Do you want to join an existing room? <Link to="/">click here</Link></p>
                </div>
            </main>
        </div>
    )
}
