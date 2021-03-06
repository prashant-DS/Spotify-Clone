import React from 'react'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import FolderCard from './FolderCard';
import Style from './Style.module.scss';

import singerLogo from '../assests/singer.svg'; 


function HomePageSection({title,description='',items,isTitleALink=true,titleLinkTo}) {

    const history = useHistory();
    const linkto = titleLinkTo?titleLinkTo:`/browse/${title}`;

    return (
        <div className={Style.homePageSection}>

            <div className={Style.introdiv}>
                <div>
                    {isTitleALink ? 
                        <h2>
                            <Link to={linkto}>
                                <span>
                                {title.replace(/([a-z](?=[A-Z]))/g,'$1 ')}
                                </span>
                            </Link>
                        </h2>
                        :
                        <h2>{title.replace(/([a-z](?=[A-Z]))/g,'$1 ')}</h2> 
                    }
                    <p>{description}</p>
                </div>
                {
                    isTitleALink&&<Link to={linkto}><p>See all</p></Link>
                }
                
            </div>

            

            {/* <div className={[Style.cardsContainer,items.length===5 && Style.coverFullSpace].join(' ')}>             */}
            <div className={[Style.cardsContainer].join(' ')}>
                {
                    items.map(item=>{
                        let imageurl=singerLogo
                        if(item.images && item.images.length>0)
                            imageurl = item.images[0].url;
                        else if(item.album && item.album.images && item.album.images.length>0)
                            imageurl=item.album.images[0].url;
                        else if(item.icons && item.icons.length>0)                                                // categories
                             imageurl = item.icons[0].url;



                        let secondary='';
                        if(item.artists)
                            secondary=(item.artists.map(art=>art.name)).join(', ');
                        else if(item.description)
                            secondary=item.description

                        return <FolderCard 
                            key={item.id}
                            imageBorderRadius={item.type==='artist' && imageurl!==singerLogo?'50%':'0px'}
                            imageurl={imageurl} 
                            name={item.name} 
                            secondary={secondary===''?undefined:secondary} 
                            click={item.type==='track'?undefined:()=>{
                                if(item.type)
                                    history.push(`/${item.type}/${item.id}`)
                                else if(item.album)                 // for user saved albums
                                    history.push(`/album/${item.album.id}`);
                                else
                                    history.push(`/categories/${item.id}`);
                            }}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default HomePageSection
