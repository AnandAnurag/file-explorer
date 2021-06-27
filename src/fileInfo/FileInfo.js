import './FileInfo.css';
import folderImage from '../list/folder.png'
import fileImage from '../list/file.png'

export default function FileInfo({ metaData }) {
    const { type, name, creator, date, size } = metaData;
    const logo = type === 'file' ? fileImage : folderImage;
    const extension = type === "file" && name.match(/(?<=\.)[a-z]+$/)[0];
    const dateObj = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <div className="info-wrapper">
            <div className="icon">
                <img src={logo} alt={name}></img>
                {
                    extension && <div className="extension">.{extension}</div>
                }
            </div>
            <div>Name:</div><div>{name}</div>
            <div>Size:</div><div>{size}</div>
            <div>Creator name:</div><div>{creator}</div>
            <div>Creation Date:</div><div>{`${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`}</div>
        </div>
    );
}