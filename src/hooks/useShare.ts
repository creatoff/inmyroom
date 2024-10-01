async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href)
    console.log('Page URL copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export const useShare = () => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: document.URL,
    }

    if (!navigator.share) {
      copyPageUrl()
      return
    }

    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    }
  }

  return { handleShare }
}
