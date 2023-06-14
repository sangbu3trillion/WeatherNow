import React from 'react';
import StyleContent from './StyleContent';

const StyleImg = () => {
    return (
        <div className="flex justify-between ">
            <div>
                <span className="mx-10 text-4xl font-semibold ">Today Style</span>
            </div>
            <div>
                <img className="w-96 h-96 rounded-lg" src="https://picsum.photos/200" />
                <div className="mt-3 w-50 text-center">
                    <a className="mx-1 border rounded-full text-transparent hover:bg-slate-400" href="#none">
                        ab
                    </a>
                    <a className="mx-1 border rounded-full text-transparent hover:bg-slate-400" href="#none">
                        ab
                    </a>
                    <a className="mx-1 border rounded-full text-transparent hover:bg-slate-400" href="#none">
                        ab
                    </a>
                    <a className="mx-1 border rounded-full text-transparent hover:bg-slate-400" href="#none">
                        ab
                    </a>
                </div>
                <StyleContent />
            </div>
            <div>
                <img className="w-50 h-50 rounded-lg" src="https://picsum.photos/200" />
            </div>
        </div>
    );
};

export default StyleImg;
