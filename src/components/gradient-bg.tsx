import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '@/contexts/theme-context';
import { ThemeStyles } from '@/util/types';

export default function GradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  const colors = {
    light: ['#e2e8f0', '#cbd5e1'],
    dark: ['#0a0a0a', '#ffffff'],
    candy: ['#5eead4', '#99f6e4'],
    stripes: ['#0a0a0a', '#ffffff'],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context || !canvas) return;

    let animationFrameId: number;

    const svgs = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-10 -10 70.45 70" preserveAspectRatio="none">
    <defs>
    <filter id="blurEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
    </defs>
    <path d="M19.11.04c3.75.52,8.92,5.08,15.75,14.3,2.73,3.69,6.95,13.38,14.21,9.94S71.13.09,70.43,7.87c-.56,6.26-1.88,10.45-3.88,16.46-2,6.01-13.2,28.98-22.97,27.91-9.76-1.06-13.71-20.4-16.02-24.41s-6.36-.67-10.36,2.46S3.44,50.37,1.03,48.54C-3.6,45.02,8.25-1.47,19.11.04Z" fill="${colors[theme][0]}" filter="url(#blurEffect)" /> </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1467.88 512.62" preserveAspectRatio="none">
    <defs>
    <filter id="blurEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
        </filter>
    </defs>
    <path d="M146.08,116.87C192.48,73.71,222.69,11.12,277.73,1.41c55.03-9.71,102.51,61.51,189.92,79.85,87.41,18.34,201.79,25.9,285.96-5.4s221.22-84.17,319.41-56.11c98.2,28.06,180.21,89.82,230.93,118.83,50.72,29.01,102.51,136.92,20.5,204.9s-112.23-116.37-161.87-171.49c-49.64-55.12-113.31-91.81-168.34-20.59-55.03,71.22-128.41,180.21-201.79,214.74-73.38,34.53-309.7,91.72-385.24-18.34-75.54-110.07-118.7-306.46-224.45-131.65-33.24,54.94-93.88,233.09-144.6,131.65C-12.55,246.36-8.24,117.95,28.45,135.21c36.69,17.27,71.22,24.82,117.62-18.34Z" fill="${colors[theme][1]}" filter="url(#blurEffect)" /> </svg>`,
    ];

    const urls = svgs.map((svg) => {
      const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
      return URL.createObjectURL(svgBlob);
    });

    const images = urls.map((url) => {
      const image = new Image();
      image.src = url;
      return image;
    });

    const scale = 2;
    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const x0 = cx - scaledWidth / 2;
    const y0 = cy - scaledHeight / 2;

    const objects = [
      {
        x: x0,
        y: y0,
        xSpeed: 0.1,
        ySpeed: 0.05,
        xDirection: 1,
        yDirection: 1,
      },
      {
        x: x0,
        y: y0,
        xSpeed: 0.12,
        ySpeed: 0.2,
        xDirection: -1,
        yDirection: -1,
      },
    ];

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      objects.forEach((object, i) => {
        object.x += object.xSpeed * object.xDirection;
        object.y += object.ySpeed * object.yDirection;

        if (Math.abs(object.x - x0) > 40) {
          object.xDirection *= -1;
        }

        if (Math.abs(object.y - y0) > 40) {
          object.yDirection *= -1;
        }

        context.drawImage(
          images[i],
          object.x,
          object.y,
          scaledWidth,
          scaledHeight
        );
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full blur-3xl "
    />
  );
}
