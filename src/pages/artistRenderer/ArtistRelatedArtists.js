import React from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import baseStyle from '../Style.module.scss';
import HomePageSection from '../../components/HomePageSection';

function ArtistRelatedArtists() {

    const {artistID} = useParams();
    const artistDetails = useSelector(state=>state.userCollection.savedData.artists[artistID]);

    return (
        <div className={baseStyle.FullScreenSectionPage}>
            <HomePageSection title={`Similar to ${artistDetails.name}`} items={artistDetails.artists} isTitleALink={false}/>
        </div>
    )
}

export default ArtistRelatedArtists
