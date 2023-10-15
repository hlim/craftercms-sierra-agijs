import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Badge, CircularProgress, Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function SoundSelector(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);

  const [isFetching, setIsFetching] = React.useState<Boolean>(false);
  const [soundCount, setSoundCount] = React.useState<number>(0);
  const [sounds, setSounds] = useState<any>();

  const loadSoundData = () => {
    let sounds = [];
    let Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');

    for (let i = 0; i < 1000; i++) {
      try {
        // @ts-ignore
        var sound = Resources.readAgiResource(Resources.AgiResource.Sound, i);

        // @ts-ignore
        if (sound) {
          sounds.push(i);
        }
      } catch (err) {}
    }

    setSounds(sounds);
    setSoundCount(sounds.length);
    setIsFetching(false);
  };

  useEffect(() => {
    loadSoundData();
  }, []);

  useEffect(() => {
    currentUrlPath && setInternalUrl(currentUrlPath);
    loadSoundData();
  }, [currentUrlPath, AgiActiveGame.currentRoom()]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickPlaySound = (sound) => {
    AgiActiveGame.agiExecute('Play Sound', 'Agi.interpreter.agi_sound(' + sound + ',1)');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let curUri = window.location.href;

  return (
    <>
      <Tooltip title={'Sound Selector'}>
        <Badge
          badgeContent={soundCount > 0 ? soundCount : null}
          color="secondary"
          overlap="circular"
          style={{ position: 'relative' }}
        >
          <IconButton
            disabled={!AgiActiveGame.gameIsLoaded()}
            size="medium"
            style={{ padding: 4 }}
            id="go-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AudiotrackRoundedIcon />
          </IconButton>
          {isFetching && (
            <CircularProgress
              size={void 0}
              value={100}
              variant={'determinate'}
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            />
          )}
        </Badge>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuList dense sx={{ width: 320 }}>
          {sounds?.map((sound, idx) => (
            <>
              <MenuItem onClick={(event) => handleClickPlaySound(sound)}>
                <strong>Sound: {sound}</strong>
              </MenuItem>
            </>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default SoundSelector;
