import '../styles/auth.scss';
import { useHistory } from 'react-router';
import { useAUth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle} = useAUth();
    const [ roomCode, setRoomCode ] = useState('');
    const { theme, toggleTheme } = useTheme();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room not found!');
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth" className={theme}>
            <button className="theme" onClick={toggleTheme}>Toggle Theme</button>
            <aside>
                <img src={illustrationImg} alt="Ilustration of questions &amp; answers" />
                <strong>Create a Q&amp;A room on-live</strong>
                <p>Answer you audience in real-time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google's logo" />
                        Create your room with Google
                    </button>
                    <div className="separator">Or enter in a room</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Type room's code"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Enter room</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
