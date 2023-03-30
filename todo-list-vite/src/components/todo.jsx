import ActionButton from "./action-button.jsx";
import trash_icon from "../assets/icons/trash-outline.svg";
import edit_icon from "../assets/icons/create-outline.svg";
import complete_icon from "../assets/icons/checkmark-done-outline.svg";
import uncomplete_icon from "../assets/icons/refresh-outline.svg";

export default function Todo({ todo, complete, edit, remove }) {
    return <div className="todo__tile">
        <div className={`todo__tile__info ${!todo.active && 'todo__tile__info__light'}`}>
            <span>{ todo.active ? 'o' : 'x'}</span>
            <p className="todo__tile__info__title">
                {todo.title[0].toUpperCase() + todo.title.substring(1)}
            </p>
        </div>
        <div className="todo__tile__actions">
            <ActionButton 
                clickFn={complete}
                iconURL={todo.active ? complete_icon : uncomplete_icon}
                altText={"done"}
                colorClass={todo.active ? "green__hover" : "yellow__hover"}
                imgSizeClass={"img__small"}
            />
            {
                todo.active
                &&
                <ActionButton 
                    clickFn={edit}
                    iconURL={edit_icon}
                    altText={"edit"}
                    colorClass={"grey__hover"}
                    imgSizeClass={"img__small"}
                />
            }
            <ActionButton 
                clickFn={remove}
                iconURL={trash_icon}
                altText={"trash"}
                colorClass={"red__hover"}
                imgSizeClass={"img__small"}
            />
        </div>
    </div>;
}