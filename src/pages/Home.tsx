import '../styles/auth.scss';
import { useHistory } from 'react-router';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { auth, firebase } from '../services/firebase'

export function Home() {
    const history = useHistory();

    function handleCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(result => {
            console.log(result);
            history.push('/rooms/new');
        });

    }

    return (
        <div id="page-auth">
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
                    <form action="">
                        <input 
                            type="text"
                            placeholder="Type room's code"
                        />
                        <Button type="submit">Enter room</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
