import '../styles/auth.scss';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

export function NewRoom() {
    const { user } = useContext(AuthContext);

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
                    <h1>{user?.name}</h1>
                    <h2>Create a new room</h2>
                    <form action="">
                        <input 
                            type="text"
                            placeholder="Room's name"
                        />
                        <Button type="submit">Create room</Button>
                    </form>
                    <p>Do you want to join an existing room? <Link to="/">click here</Link></p>
                </div>
            </main>
        </div>
    )
}
