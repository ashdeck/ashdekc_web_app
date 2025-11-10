interface BgProps {
    background?: string;
}

export default function Background({ background }: BgProps) {
    return (
        <div
        className="w-[100vw] h-[100vh] absolute top-0 left-0 -z-10"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
        >
        {/* Overlay */}
        <div className="w-full h-full bg-black/40 absolute top-0 left-0">
            <div className="w-full h-full relative">
            {/* Bottom-Centered Content */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-8 px-4 flex items-center justify-center">
                <p className="text-[1rem]">Background photo credit: <a className="text-green-500 hover:text-green-500 no-underline" href={`${background.photo_credit.link}`} target="_blank">{background.photo_credit.name}</a></p>
            </div> */}
            </div>
        </div>
        </div>
    );
}
