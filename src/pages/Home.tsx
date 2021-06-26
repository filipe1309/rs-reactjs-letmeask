import '../styles/auth.scss';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

export function Home() {
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
                    <button className="create-room">
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
