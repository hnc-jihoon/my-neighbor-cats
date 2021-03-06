import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCatName, getCatPhotoUrl, isCatPhoto } from '../channel/backendInfo.js';
import styles from '../styles/CatPhoto.module.scss';

// TODO: fix type
const Photo: any = () => {

  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('');
  const [catName, setCatName] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [isCat, setIsCat] = useState(false);

  useEffect(() => {
    let { id, uploader } = router.query;
    if (!id) {
      return;
    }

    // TODO: fix these stupid lines
    id = Array.isArray(id) ? id[0] : id || '';
    uploader = Array.isArray(uploader) ? uploader[0] : uploader || '';

    getCatName(id)
      .then((name: string) => {
        setCatName(name);
      });

    getCatPhotoUrl(id)
      .then((url: string) => {
        setImageSrc(url);
      });

    isCatPhoto(id)
      .then((isCat: boolean) => {
        setIsCat(isCat);
      })

    setUploaderName(uploader);
  }, [router.query]);

  return (
    <>
      <p className={styles.loadingMsg}>
        Loading...
      </p>

      {catName && (
        <div className={styles.catNameBox}>
          <p className={styles.catName}>
            {catName}
          </p>
          <p className={styles.uploader}>
            (by {uploaderName})
          </p>
        </div>
      )}

      {imageSrc && (
        <Image
          src={imageSrc}
          alt="cat photo"
          layout="fill"
          objectFit="contain"
        />
      )}

      <p className={styles.isCat}>
        cat detector:
        <span className={isCat ? styles.msgPositive : styles.msgNegative}>
          {isCat ? `"This is a cat."` : `"This is NOT a cat!"`}
        </span>
      </p>

      <button
        className={styles.back}
        onClick={router.back}
        >
        ← Back
      </button>
    </>
  );
};

export default Photo;
