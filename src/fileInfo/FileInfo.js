import './FileInfo.css';
import folderImage from '../list/folder.png'
import fileImage from '../list/file.png'

export default function FileInfo({ metaData }) {
    const { type, name, creator, date, size } = metaData;
    const logo = type === 'file' ? fileImage : folderImage;

    return (
        <div className="info-wrapper">
            <div className="icon">
                <img src={logo} alt={name}></img>
            </div>
            <div>Name:</div><div>{name}</div>
            <div>Size:</div><div>{size}</div>
            <div>Creator name:</div><div>{creator}</div>
            <div>Creation Date:</div><div>{date}</div>
        </div>
    );
}