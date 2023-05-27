import * as React from 'react';

interface AvatarProps {
  children?: React.ReactNode;
}

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type AvatarContextType = {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: React.Dispatch<React.SetStateAction<ImageLoadingStatus>>;
};

const AvatarContext = React.createContext<AvatarContextType | undefined>(undefined);

function AvatarProvider({
  children,
  ...contextProps
}: { children: React.ReactNode } & AvatarContextType) {
  return <AvatarContext.Provider value={contextProps}>{children}</AvatarContext.Provider>;
}

function useAvatarContext() {
  const context = React.useContext(AvatarContext);

  if (!context) throw new Error('no context value');

  return context;
}

function Avatar(props: AvatarProps) {
  const [imageLoadingStatus, setImageLoadingStatus] = React.useState<ImageLoadingStatus>('idle');

  return (
    <AvatarProvider
      imageLoadingStatus={imageLoadingStatus}
      onImageLoadingStatusChange={setImageLoadingStatus}
    >
      <span {...props}></span>
    </AvatarProvider>
  );
}

function AvatarImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { alt, src, ...imgProps } = props;

  const { imageLoadingStatus, onImageLoadingStatusChange } = useAvatarContext();

  React.useEffect(() => {
    if (src) {
      const img = new window.Image();

      const updateStatus = (status: ImageLoadingStatus) => () => {
        onImageLoadingStatusChange(status);
      };

      img.onload = updateStatus('loaded');
      img.onerror = updateStatus('error');
      img.src = src;
    }
  }, [src]);

  return imageLoadingStatus === 'loaded' ? <img alt={alt} src={src} {...imgProps} /> : null;
}

function AvatarFallback({ children, ...fallbackProps }: { children: React.ReactNode }) {
  const { imageLoadingStatus } = useAvatarContext();
  return imageLoadingStatus === 'error' ? <span {...fallbackProps}>{children}</span> : null;
}

const Root = Avatar;

export { Root, AvatarImage, AvatarFallback };
