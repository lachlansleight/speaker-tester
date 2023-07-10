import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaMusic, FaSync } from "react-icons/fa";
import useInterval from "lib/useInterval";
import useKeyboard from "lib/useKeyboard";

const SpeakerTester = (): JSX.Element => {
    const [playingLeft, setPlayingLeft] = useState(false);
    const [playingRight, setPlayingRight] = useState(false);
    const [playingChord, setPlayingChord] = useState(false);

    const leftAudio = useRef<HTMLAudioElement>(null);
    const rightAudio = useRef<HTMLAudioElement>(null);
    const chordAudio = useRef<HTMLAudioElement>(null);

    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        if (!leftAudio.current) return;
        leftAudio.current.onplay = () => setPlayingLeft(true);
        leftAudio.current.onpause = () => setPlayingLeft(false);
    }, [leftAudio]);

    useEffect(() => {
        if (!rightAudio.current) return;
        rightAudio.current.onplay = () => setPlayingRight(true);
        rightAudio.current.onpause = () => setPlayingRight(false);
    }, [rightAudio]);

    useEffect(() => {
        if (!chordAudio.current) return;
        chordAudio.current.onplay = () => setPlayingChord(true);
        chordAudio.current.onpause = () => setPlayingChord(false);
    }, [chordAudio]);

    useInterval(() => {
        if (!leftAudio.current) return;
        if (!rightAudio.current) return;
        if (!autoplay) return;

        leftAudio.current.play();
        setTimeout(() => {
            if (!rightAudio.current) return;
            if (!autoplay) return;
            rightAudio.current.play();
        }, 1000);
    }, 2000);

    useKeyboard(
        e => {
            if (e.key === "ArrowLeft") leftAudio.current?.play();
            if (e.key === "ArrowRight") rightAudio.current?.play();
            if (e.key === "ArrowUp") {
                if (playingChord) {
                    chordAudio.current?.pause();
                    if (chordAudio.current) chordAudio.current.currentTime = 0;
                } else chordAudio.current?.play();
            }
            if (e.key === " ") setAutoplay(cur => !cur);
        },
        [leftAudio, rightAudio, chordAudio, autoplay]
    );

    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="flex flex-col gap-4">
                <h1 className="text-center text-4xl font-mono text-white text-opacity-40">
                    Speaker Tester
                </h1>
                <div className="flex gap-4 w-screen justify-center">
                    <button
                        className={`${
                            playingLeft ? "bg-red-600" : "bg-primary-600"
                        } rounded-full text-4xl px-8 py-8`}
                        onClick={() => leftAudio.current?.play()}
                        disabled={playingLeft}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className={`${
                            playingChord ? "bg-red-600" : "bg-primary-600"
                        } rounded-full text-4xl px-8 py-8`}
                        onClick={() => {
                            if (playingChord) {
                                chordAudio.current?.pause();
                                if (chordAudio.current) chordAudio.current.currentTime = 0;
                            } else chordAudio.current?.play();
                        }}
                    >
                        <FaMusic />
                    </button>
                    <button
                        className={`${
                            playingRight ? "bg-red-600" : "bg-primary-600"
                        } rounded-full text-4xl px-8 py-8`}
                        onClick={() => rightAudio.current?.play()}
                        disabled={playingRight}
                    >
                        <FaArrowRight />
                    </button>
                </div>
                <div className="flex gap-4 w-screen justify-center">
                    <button
                        className={`${
                            autoplay ? "bg-red-600" : "bg-primary-600"
                        } rounded-full text-2xl px-4 py-4`}
                        onClick={() => setAutoplay(cur => !cur)}
                    >
                        <FaSync />
                    </button>
                </div>
            </div>

            <audio src="/audio/left.mp3" ref={leftAudio} />
            <audio src="/audio/right.mp3" ref={rightAudio} />
            <audio src="/audio/chord.wav" ref={chordAudio} />
        </div>
    );
};

export default SpeakerTester;
