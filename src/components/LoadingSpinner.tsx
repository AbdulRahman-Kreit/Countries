
export default function LoadingSpinner() {
    return (
        <div role="status" className="w-10 h-10 rounded-full bg-(--text-color) relative">
            <div className="absolute w-full h-full rounded-full animate-ping bg-(--text-color)"></div>
            <div className="absolute w-full h-full rounded-full animate-ping delay-200 bg-(--text-color)"></div>
        </div>
    )
}
