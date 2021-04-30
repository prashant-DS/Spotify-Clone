import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import defaultLogo from '../assests/musicFolder.svg'
import Style from './Style.module.scss';

function FolderCard({imageurl,name,secondary,click,imageBorderRadius}) {
    return (
        <div className={Style.folderCard} onClick={click}>
            <LazyLoadImage
                src={imageurl} 
                alt={name} 
                placeholderSrc={defaultLogo}
                effect='blur'

                style={{borderRadius:imageBorderRadius}}
            />
            <div className={Style.primary}><h3>{name}</h3></div>
            {secondary && <div className={Style.secondary}><p>{secondary}</p></div>}
        </div>
    )
}

export default FolderCard
