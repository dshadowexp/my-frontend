export default function ActionButton({ clickFn, iconURL, altText, colorClass, imgSizeClass }) {
    return <button 
        className={`todo__action ${colorClass}`}
        onClick={clickFn}
    >
        <img className={imgSizeClass} src={iconURL} alt={altText} />
    </button>
}