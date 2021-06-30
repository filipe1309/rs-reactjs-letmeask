import '../styles/auth.scss';
import { useHistory } from 'react-router';
import { useAUth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    roomCode: Yup.string().min(3, 'Min of 3 chars').required('Room code required')
})

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle} = useAUth();
    const { theme, toggleTheme } = useTheme();
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(data: any) {
        const { roomCode } = data;

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room not found!');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed!');
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
                    <form onSubmit={handleSubmit(handleJoinRoom)}>
                        <input 
                            type="text"
                            placeholder="Type room's code"
                            {...register('roomCode')}
                        />
                        <Button type="submit">Enter room</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
