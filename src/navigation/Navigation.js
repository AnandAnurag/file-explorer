import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navigation.css';
import dropdown from './dropdown.svg';
import { goto } from '../features/navigate/navigateSlice';
export default function Navigation() {
    const dispatch = useDispatch();
    const root = useSelector(state => state.root);
    return (
        <>
            <div className="folder-link root-link" onClick={() => {
                dispatch(goto({ location: "/" }));
            }}>ROOT</div>
            <QuickLinks dir={root} path="/" />
        </>
    );
}

function QuickLinks({ dir, path }) {
    const { folders } = dir;
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            {
                Object.keys(folders).map((name, i) => {
                    const hasSubFolder = Object.keys(folders[name]['folders']).length > 0;
                    return (
                        <div key={`quick-links-${i}`} className="folder-wrapper">
                            <div className="folder-link-wrapper">
                                <div className="folder-link" onClick={() => {
                                    dispatch(goto({ location: `${path}/${name}` }));
                                }}>
                                    <div>{name}</div>
                                </div>
                                {
                                    hasSubFolder && (<div className="sub-folder-toggle" onClick={() => setShow(!show)}>
                                        <img src={dropdown} alt={show ? "hide" : "show"} style={show ? { transform: "rotate(180deg)" } : {}} />
                                    </div>)
                                }
                            </div>
                            {
                                hasSubFolder && show && (
                                    <div className="sub-folder-wrapper">
                                        <QuickLinks dir={folders[name]} path={`${path}/${name}`} />
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    );
}