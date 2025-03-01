type props = {
    icon: string
    size?: string
}

const Icons = ({icon,size ="30px"} : props) => {
    return (
        <svg className={`w-[${size}]`} fill="currentColor">
            <use href={icon} />
        </svg>
    )
}

export default Icons