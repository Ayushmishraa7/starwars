import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isOnFavoriteList } from '../../utils/favoriteListServices';
import { CharacterInterface } from '../../utils/types';
import { addToList, setIsError } from '../../store/actions';
import { CharacterItem } from '../CharacterItem/CharacterItem';
import Pagination from '../Pagination/Pagination';
import { CharactersListProps } from './types';
import { toast } from 'react-toastify';

export const CharactersList = ({ data, favoriteList }: CharactersListProps) => {
  const dispatch = useDispatch();

  //  toast info
  const addToFavoritesToast = (info: string) => toast.success(info);

  useEffect(() => {
    data.count === 0 ? dispatch(setIsError(true)) : dispatch(setIsError(false));
  }, [data.count, dispatch]);

  return (
    <>
      {data.results.map((character: CharacterInterface) => (
        <div
          key={character.created}
          className="rounded-2xl mb-4 w-[90%] my-4 mx-auto border-3px border-accent-color md:w-[50%]"
        >
          <CharacterItem
            btnIcon={faPlus}
            character={character}
            favoriteList={favoriteList}
            action={() => {
              dispatch(addToList(character));
              addToFavoritesToast(
                `Been added to the favorites list, ${character.name} has.`
              );
            }}
            isDisable={Boolean(isOnFavoriteList(favoriteList!, character))}
            tip={
              isOnFavoriteList(favoriteList!, character)
                ? 'Delete from favorites'
                : 'Add to favorites'
            }
          />
        </div>
      ))}
      <Pagination charactersAmount={data.count} />
    </>
  );
};
