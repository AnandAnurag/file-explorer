import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/root/rootSlice';
import { getLocation } from '../features/navigate/navigateSlice';
import { ModalContext } from '../modal/Modal';
import './Create.css';
export default function Create() {
    const { closeBtnRef } = useContext(ModalContext);
    const location = useSelector(getLocation);
    const [isFile, setIsFile] = useState(true);
    const [name, setName] = useState("babel.js");
    const [creator, setCreator] = useState("Anurag Anand");
    const [size, setSize] = useState("131kb");
    const [date, setDate] = useState("27 June, 2021");
    const dispatch = useDispatch();
    const createHandler = () => {
        dispatch(add({
            type: isFile ? 'file' : 'folder',
            name,
            creator,
            size,
            date,
            location
        }));
        closeBtnRef.current.click();
    };

    return (
        <div class="create">
            <div class="fields">
                <button className={"radio-btn " + (isFile ? "" : "inactive")} onClick={() => setIsFile(true)}>File</button>
                <button className={"radio-btn " + (isFile ? "inactive" : "")} onClick={() => setIsFile(false)}>Folder</button>
            </div>
            <div class="fields">
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} value={name}></input>
            </div>
            <div class="fields">
                <input type="text" placeholder="Creator" onChange={e => setCreator(e.target.value)} value={creator}></input>
            </div>
            <div class="fields">
                <input type="text" placeholder="Size" onChange={e => setSize(e.target.value)} value={size}></input>
            </div>
            <div class="fields">
                <input type="text" placeholder="Date" onChange={e => setDate(e.target.value)} value={date}></input>
            </div>
            <div class="action">
                <button onClick={createHandler}>Create</button>
            </div>
        </div>
    );
}