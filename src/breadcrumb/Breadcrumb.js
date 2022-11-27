import { useDispatch, useSelector } from 'react-redux';
import { goto, getLevels, getLocation } from '../features/navigate/navigateSlice';
import './Breadcrumb.css';
import arrowImage from './arrow-green-circle.png';

export default function Breadcrumb() {
    const location = useSelector(getLocation);
    const levels = useSelector(getLevels);
    const crumbLinks = [];
    const dispatch = useDispatch();
    const parents = [];
    for (let [i, level] of Object.entries(levels)) {
        if (Number(i) < (levels.length - 1)) {
            crumbLinks.push(<div
                key={`level-${i}`}
                className="crumb-level"
                onClick={e => {
                    e.preventDefault();
                    dispatch(goto({
                        location: '/' + levels.slice(1, Number(i) + 1).join('/')
                    }));
                }}>{level}</div>);
            crumbLinks.push(<div key={`seperator-${i}`} className="crumb-level-seperator">/</div>);
        } else {
            crumbLinks.push(<div key={`level-${i}`} className="crumb-level">{level}</div>);
        }
        if (Number(i)) parents.push(level);
    }
    return (
        <div className="breadcrumb">
            {location !== '/' && <div className="image-wrapper">
                <img src={arrowImage} alt="Back" onClick={() => {
                        const back = '/' + location.split('/').slice(1, levels.length - 1).join('/');
                        dispatch(goto({
                            location: back
                        }));
                }} />
            </div>}
            {crumbLinks}
        </div>
    );

}
