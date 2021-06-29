import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAUth } from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string;
    }>;
}>

export function useRoom(roomId: string) {
    const { user } = useAUth();
    const [ questions, setQuestions ] = useState<QuestionType[]>([]);
    const [ title, setTitle ] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                const { content, author, isHighlighted, isAnswered, likes } = value;
                return {
                    id: key,
                    content,
                    author,
                    isHighlighted,
                    isAnswered,
                    likeCount: Object.values(likes ?? {}).length,
                    likeId: Object.entries(likes ?? {}).find(([key ,like]) => like.authorId === user?.id)?.[0]
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            roomRef.off('value');
        };
    }, [roomId, user?.id]);
    
    return { questions, title };
}
