import React from 'react'

import Style from './Style.module.scss';

function FolderCard({imageurl,name,secondary,click,imageBorderRadius}) {
    return (
        <div className={Style.folderCard} onClick={click}>
            <img src={imageurl} alt={name} style={{borderRadius:imageBorderRadius}}/>
            <div className={Style.primary}><h3>{name}</h3></div>
            {secondary && <div className={Style.secondary}><p>{secondary}</p></div>}
        </div>
    )
}

export default FolderCard
