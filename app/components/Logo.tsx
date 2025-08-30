import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
    return (
        <div className="flex ">
            <FontAwesomeIcon icon={faBook} className="text-4xl text-black"/>
            <h1 className="text-3xl font-bold">Bookify</h1>
        </div>
    )
}