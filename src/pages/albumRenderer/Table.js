    import React, { useRef,useEffect } from 'react'
import {Link} from 'react-router-dom';

import Style from './Style.module.scss';

function Table({songs}) {

    const headerRef = useRef(null);
    const containerRef=useRef(null);

    const checkHeaderSticky = () =>{
        let limit = (window.screen.height/10)+1;
        headerRef?.current?.parentElement.classList.toggle(`${Style.sticked}`,headerRef.current.getBoundingClientRect().y <= limit);
        
    }
    // let par=undefined;
    useEffect(() => {
        containerRef.current.parentElement.addEventListener('scroll',checkHeaderSticky);
        const par=containerRef.current.parentElement;
        return () => {
            par.removeEventListener('scroll',checkHeaderSticky);
        }
    }, [containerRef])

    
    
    const pad = num =>{
        let s = num.toString();
        while(s.length < 2)
            s="0"+s;
        return s;
    }


    return (
        <div className={Style.tableContainer} ref={containerRef}>
            <table className={Style.table}>
                <colgroup>
                <col style={{width:"5%"}}/>
                <col style={{width:"85%"}}/>
                <col style={{width:"10%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th ref={headerRef}>#</th>
                        <th>Title</th>
                        <th>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songs.map(song=><tr key={song.id}>
                            <td></td>
                            <td>
                                <div className={Style.titlediv}>
                                    <span className={Style.highlighted}>{song.name}</span>
                                    <br/>
                                    {
                                        song.artists.slice(0,-1).map(art=><React.Fragment key={art.id}>
                                            <Link to={`/artist/${art.id}`}>
                                                <span>{art.name}</span>
                                            </Link>
                                            <span>{' , '}</span>
                                        </React.Fragment>)
                                    }
                                    {
                                        song.artists.slice(-1).map(art=><React.Fragment  key={art.id}>
                                            <Link to={`/artist/${art.id}`}>
                                                <span>{art.name}</span>
                                            </Link>
                                        </React.Fragment>)
                                    }
                                </div>
                            </td>
                            <td>{`${Math.trunc(Math.ceil(song.duration_ms/1000)/60)}:${pad(Math.ceil(song.duration_ms/1000)%60)}`}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default Table
