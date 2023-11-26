export interface ArticleInfoType {
  title: string;
  category: string;
  url: string;
  imageUrl: string;
  tags: string;
  brief: string;
  tableOfContent: string;
  active: string;
}

export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
