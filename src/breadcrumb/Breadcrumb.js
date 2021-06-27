import { useDispatch, useSelector } from 'react-redux';
import { goto, getLevels, getLocation } from '../features/navigate/navigateSlice';
import './Breadcrumb.css';
import arrowImage from './arrow-green-circle.png';

export default function Breadcrumb() {
    const location = useSelector(getLocation);
    const levels = useSelector(getLevels);
    const crumbLinks = [];
    const dispatch = useDispatch();
    for (let [i, level] of Object.entries(levels)) {
        crumbLinks.push(<div key={`level-${i}`} className="crumb-level">{level}</div>);
        if (Number(i) < (levels.length - 1))
            crumbLinks.push(<div key={`seperator-${i}`} className="crumb-level-seperator">/</div>);
    }
    return (
        <div className="breadcrumb">
            <div className="image-wrapper">
                <img src={arrowImage} alt="Back" onClick={() => {
                    if (location !== '/') {
                        const back = location.split('/').slice(0, levels.length - 1).join('/');
                        dispatch(goto({
                            location: back
                        }));
                    }
                }} />
            </div>
            {crumbLinks}
        </div>
    );

}
