"use client";

import { useRef, useState, useEffect } from "react";
import styles from '../assets/css/CanvasDraw.module.css';

const CanvasDraw = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!ctx || !canvas) {
            throw new Error("Não foi possível estabelecer um contexto com o canvas.");
        }
        const startDrawing = (event: MouseEvent) => {
            setIsDrawing(true);
            setLastPosition({ x: event.offsetX, y: event.offsetY });
        };

        const stopDrawing = () => {
            setIsDrawing(false);
            setLastPosition(null);
        };

        const handleDrawing = (event: MouseEvent) => {
            if (!isDrawing || !lastPosition) return;
 
            const currentX = event.offsetX;
            const currentY = event.offsetY;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(lastPosition.x, lastPosition.y);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            setLastPosition({ x:currentX, y:currentY });
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', handleDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mousemove', handleDrawing);
        };
    }, [isDrawing, lastPosition]); 

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) {
            throw new Error("Não foi possível estabelecer um contexto com o canvas.");
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <canvas
                className={styles.canvas}
                width={800}
                height={400}
                ref={canvasRef}
            />
            <button className="w-25 flex-none border mt-10 bg-black-300 hover:bg-gray-800 text-white font-bold py-2 px-2 rounded" onClick={clearCanvas}>Limpar quadro</button>
        </div>
    );
};

export default CanvasDraw;
