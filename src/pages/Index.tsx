import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  duration: string;
  videoUrl?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'СПРУНКИ ПОЛНОЕ ПРОХОЖДЕНИЕ! ВСЕ СЕКРЕТЫ И ПЕРСОНАЖИ',
    thumbnail: '/img/c1a2dfc7-19f2-4068-97b7-62dc9e3a4535.jpg',
    channel: 'SprunKids TV',
    channelAvatar: '',
    views: '3.2M просмотров',
    uploadTime: '1 день назад',
    duration: '18:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: '🎵 Полное прохождение игры Спрунки! Показываю все секретные персонажи, комбинации звуков и пасхалки! Лучший гайд по Sprunki Incredibox для детей и взрослых!',
    likes: 45200,
    dislikes: 892,
    isLiked: false,
    isDisliked: false
  },
  {
    id: '2',
    title: 'РОБЛОКС ПОБЕГ ИЗ ТЮРЬМЫ! НОВЫЙ СПОСОБ 2024',
    thumbnail: '/img/86834efc-4338-480b-b426-29ab1a0f7852.jpg',
    channel: 'Roblox Master',
    channelAvatar: '',
    views: '2.8M просмотров',
    uploadTime: '3 часа назад',
    duration: '12:30',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: '🔥 САМЫЙ КРУТОЙ СПОСОБ ПОБЕГА! Показываю секретный глитч в Jailbreak Roblox, который работает в 2024 году! АДМИНЫ НЕ ЗНАЮТ!',
    likes: 38900,
    dislikes: 1250,
    isLiked: false,
    isDisliked: false
  },
  {
    id: '3',
    title: 'СПРУНКИ ХОРРОР ВЕРСИЯ! САМЫЕ СТРАШНЫЕ ПЕРСОНАЖИ',
    thumbnail: '/img/ddb81c3f-f5d2-4f46-a4c2-150c35d85000.jpg',
    channel: 'SprunKids TV',
    channelAvatar: '',
    views: '1.9M просмотров',
    uploadTime: '2 дня назад',
    duration: '15:22',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: '😱 ВНИМАНИЕ! Хоррор версия Спрунки! Показываю самых страшных персонажей и секретные комбинации для жуткой музыки! НЕ СМОТРЕТЬ НОЧЬЮ!',
    likes: 29800,
    dislikes: 2100,
    isLiked: false,
    isDisliked: false
  },
  {
    id: '4',
    title: 'РОБЛОКС ВСЕ КОДЫ НА РОБУКСЫ! РАБОЧИЕ 2024',
    thumbnail: '/img/86834efc-4338-480b-b426-29ab1a0f7852.jpg',
    channel: 'Roblox Master',
    channelAvatar: '',
    views: '5.7M просмотров',
    uploadTime: '1 неделю назад',
    duration: '10:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: '💰 ВСЕ РАБОЧИЕ КОДЫ НА БЕСПЛАТНЫЕ РОБУКСЫ! Показываю секретные промокоды Roblox 2024! ПОЛУЧИ 1000 РОБУКСОВ БЕСПЛАТНО!',
    likes: 89400,
    dislikes: 5200,
    isLiked: false,
    isDisliked: false
  },
  {
    id: '5',
    title: 'СПРУНКИ VS РОБЛОКС - КТО КРУЧЕ? СРАВНЕНИЕ ИГОР',
    thumbnail: '/img/c1a2dfc7-19f2-4068-97b7-62dc9e3a4535.jpg',
    channel: 'Game Battle',
    channelAvatar: '',
    views: '1.4M просмотров',
    uploadTime: '5 дней назад',
    duration: '16:40',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: '⚔️ ЭПИЧНАЯ БИТВА! Сравниваю Sprunki и Roblox - какая игра лучше? Тестирую геймплей, графику, музыку! Мое честное мнение!',
    likes: 22150,
    dislikes: 890,
    isLiked: false,
    isDisliked: false
  },
  {
    id: '6',
    title: 'НОВЫЕ ПЕРСОНАЖИ СПРУНКИ! ОБНОВЛЕНИЕ 2024',
    thumbnail: '/img/ddb81c3f-f5d2-4f46-a4c2-150c35d85000.jpg',
    channel: 'SprunKids TV',
    channelAvatar: '',
    views: '2.6M просмотров',
    uploadTime: '4 дня назад',
    duration: '14:28',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: '🆕 НОВОЕ ОБНОВЛЕНИЕ СПРУНКИ! Показываю всех новых персонажей, их звуки и анимации! Теперь можно создавать еще более крутую музыку!',
    likes: 41300,
    dislikes: 760,
    isLiked: false,
    isDisliked: false
  }
];

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'SprunFan2024',
    authorAvatar: '',
    content: 'СПРУНКИ ЛУЧШАЯ ИГРА! Спасибо за гайд, теперь знаю все секреты! 🎵✨',
    timestamp: '30 минут назад',
    likes: 245,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        author: 'SprunKids TV',
        authorAvatar: '',
        content: 'Рад что помог! Скоро выйдет видео про новых персонажей! 🔥',
        timestamp: '15 минут назад',
        likes: 89,
        isLiked: false
      }
    ]
  },
  {
    id: '2',
    author: 'RobloxGamer',
    authorAvatar: '',
    content: 'Можете снять видео про новую карту в роблокс? 🎮',
    timestamp: '1 час назад',
    likes: 156,
    isLiked: false
  },
  {
    id: '3',
    author: 'МузыкальныйГений',
    authorAvatar: '',
    content: 'Сделал свою музыку в Спрунки благодаря вашему видео! ТОП КОНТЕНТ! 🎶',
    timestamp: '2 часа назад',
    likes: 312,
    isLiked: true
  },
  {
    id: '4',
    author: 'Игроман2024',
    authorAvatar: '',
    content: 'ПЕРВЫЙ! Кто еще любит Спрунки и Роблокс? ❤️',
    timestamp: '3 часа назад',
    likes: 78,
    isLiked: false
  }
];

export default function Index() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(sampleVideos);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVideos(sampleVideos);
    } else {
      const filtered = sampleVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchQuery]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleVideoClick = (video: Video) => {
    setCurrentVideo(video);
    setCurrentTab('watch');
  };

  const handleLikeVideo = () => {
    if (currentVideo) {
      setCurrentVideo({
        ...currentVideo,
        isLiked: !currentVideo.isLiked,
        isDisliked: false,
        likes: currentVideo.isLiked 
          ? (currentVideo.likes || 0) - 1 
          : (currentVideo.likes || 0) + 1
      });
    }
  };

  const handleDislikeVideo = () => {
    if (currentVideo) {
      setCurrentVideo({
        ...currentVideo,
        isDisliked: !currentVideo.isDisliked,
        isLiked: false,
        dislikes: currentVideo.isDisliked 
          ? (currentVideo.dislikes || 0) - 1 
          : (currentVideo.dislikes || 0) + 1
      });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Вы',
        authorAvatar: '',
        content: newComment,
        timestamp: 'только что',
        likes: 0,
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    setSubscriberCount(prev => isSubscribed ? prev - 1 : prev + 1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Все') {
      setFilteredVideos(sampleVideos);
    } else {
      const categoryMap: { [key: string]: string[] } = {
        'Спрунки': ['спрунки', 'sprunki'],
        'Роблокс': ['роблокс', 'roblox'],
        'Игры': ['игр', 'game', 'побег', 'коды'],
        'Музыка': ['музык', 'звук', 'персонаж']
      };
      
      const keywords = categoryMap[category] || [];
      const filtered = sampleVideos.filter(video => 
        keywords.some(keyword => 
          video.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setFilteredVideos(filtered);
    }
  };

  const handleShare = async () => {
    if (currentVideo) {
      try {
        await navigator.share({
          title: currentVideo.title,
          text: currentVideo.description,
          url: window.location.href
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
        alert('Ссылка скопирована!');
      }
    }
  };

  const handleDownload = () => {
    if (currentVideo?.videoUrl) {
      const a = document.createElement('a');
      a.href = currentVideo.videoUrl;
      a.download = `${currentVideo.title}.mp4`;
      a.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setUploadFile(file);
    }
  };

  const VideoCard = ({ video }: { video: Video }) => (
    <Card className="video-card group" onClick={() => handleVideoClick(video)}>
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="video-thumbnail"
        />
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1">
          {video.duration}
        </Badge>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
          </div>
        </div>
      </div>
      <div className="video-info">
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {video.channel.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="video-title">{video.title}</h3>
            <p className="channel-name">{video.channel}</p>
            <p className="video-stats">{video.views} • {video.uploadTime}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  const CommentComponent = ({ comment }: { comment: Comment }) => (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-muted text-xs">
            {comment.author.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{comment.author}</span>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto text-xs"
              onClick={() => handleLikeComment(comment.id)}
            >
              <Icon 
                name="ThumbsUp" 
                size={16} 
                className={comment.isLiked ? 'text-primary' : 'text-muted-foreground'} 
              />
              <span className="ml-1">{comment.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-auto text-xs">
              <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
              <span className="ml-1">Ответить</span>
            </Button>
          </div>
        </div>
      </div>
      {comment.replies && (
        <div className="ml-11 space-y-3">
          {comment.replies.map(reply => (
            <CommentComponent key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => alert('Меню пока не работает! Используйте боковую панель')}
            >
              <Icon name="Menu" size={24} />
            </Button>
            <div className="flex items-center gap-2" onClick={() => {setCurrentTab('home'); setCurrentVideo(null);}}>
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer">
                <Icon name="Play" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold cursor-pointer">YouTube V2</span>\n              \n              {/* Sprunki Game Link */}\n              <a \n                href="/sprunki" \n                className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transition-transform animate-pulse text-sm"\n              >\n                🎵 ИГРАТЬ В СПРУНКИ!\n              </a>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 bg-secondary border-border"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => setCurrentTab('upload')}
            >
              <Icon name="Video" size={24} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 relative"
              onClick={() => alert('У вас 3 новых уведомления:\n1. Новый подписчик!\n2. Комментарий к видео\n3. Лайк на видео')}
            >
              <Icon name="Bell" size={24} />
              <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-0 h-5 flex items-center">
                3
              </Badge>
            </Button>
            <Avatar 
              className="w-8 h-8 cursor-pointer"
              onClick={() => setCurrentTab('profile')}
            >
              <AvatarFallback className="bg-primary text-primary-foreground">
                У
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-[73px] w-60 h-[calc(100vh-73px)] bg-sidebar-background border-r border-sidebar-border overflow-y-auto">
          <nav className="p-3 space-y-1">
            <div 
              className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentTab('home')}
            >
              <Icon name="Home" size={20} />
              <span>Главная</span>
            </div>
            <div 
              className={`nav-item ${currentTab === 'subscriptions' ? 'active' : ''}`}
              onClick={() => setCurrentTab('subscriptions')}
            >
              <Icon name="Users" size={20} />
              <span>Подписки</span>
            </div>
            <div 
              className={`nav-item ${currentTab === 'upload' ? 'active' : ''}`}
              onClick={() => setCurrentTab('upload')}
            >
              <Icon name="Upload" size={20} />
              <span>Загрузить</span>
            </div>
            <div 
              className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentTab('profile')}
            >
              <Icon name="User" size={20} />
              <span>Профиль</span>
            </div>
            <div 
              className={`nav-item ${currentTab === 'settings' ? 'active' : ''}`}
              onClick={() => setCurrentTab('settings')}
            >
              <Icon name="Settings" size={20} />
              <span>Настройки</span>
            </div>
          </nav>

          <div className="mt-6 px-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Подписки</h3>
            <div className="space-y-2">
              {['DevMaster', 'Кулинарный Мир', 'GameZone Pro'].map((channel) => (
                <div key={channel} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-muted text-xs">
                      {channel.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-sidebar-foreground">{channel}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-60 p-6">
          {currentTab === 'home' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Рекомендации</h1>
                <div className="flex gap-2">
                  {['Все', 'Спрунки', 'Роблокс', 'Игры', 'Музыка'].map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'secondary'}
                      className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ничего не найдено</h3>
                  <p className="text-muted-foreground">Попробуйте изменить запрос поиска</p>
                </div>
              )}
            </div>
          )}

          {currentTab === 'subscriptions' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Подписки</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVideos.slice(0, 3).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {currentTab === 'watch' && currentVideo && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Column */}
                <div className="lg:col-span-2 space-y-4">
                  <Card className="overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      className="w-full aspect-video"
                      poster={currentVideo.thumbnail}
                      controls
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source src={currentVideo.videoUrl} type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </Card>

                  <div className="space-y-4">
                    <h1 className="text-xl font-bold">{currentVideo.title}</h1>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {currentVideo.channel.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentVideo.channel}</p>
                          <p className="text-sm text-muted-foreground">{subscriberCount.toLocaleString()} подписчиков</p>
                        </div>
                        <Button 
                          className={`ml-4 ${isSubscribed ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'youtube-button'}`}
                          onClick={handleSubscribe}
                        >
                          {isSubscribed ? 'Подписка оформлена' : 'Подписаться'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-secondary rounded-full">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`rounded-l-full px-4 py-2 ${currentVideo.isLiked ? 'text-primary' : ''}`}
                            onClick={handleLikeVideo}
                          >
                            <Icon name="ThumbsUp" size={20} className="mr-2" />
                            {currentVideo.likes?.toLocaleString()}
                          </Button>
                          <Separator orientation="vertical" className="h-6" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`rounded-r-full px-4 py-2 ${currentVideo.isDisliked ? 'text-primary' : ''}`}
                            onClick={handleDislikeVideo}
                          >
                            <Icon name="ThumbsDown" size={20} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full px-4"
                          onClick={handleShare}
                        >
                          <Icon name="Share" size={16} className="mr-2" />
                          Поделиться
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full px-4"
                          onClick={handleDownload}
                        >
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать
                        </Button>
                      </div>
                    </div>

                    <Card className="p-4 bg-secondary">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-medium">{currentVideo.views}</span>
                        <span className="text-sm text-muted-foreground">{currentVideo.uploadTime}</span>
                      </div>
                      <p className="text-sm">{currentVideo.description}</p>
                    </Card>

                    {/* Comments Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{comments.length} комментариев</h3>
                      
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            У
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <Textarea
                            placeholder="Добавьте комментарий..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setNewComment('')}
                            >
                              Отмена
                            </Button>
                            <Button 
                              size="sm" 
                              className="youtube-button"
                              onClick={handleAddComment}
                              disabled={!newComment.trim()}
                            >
                              Комментировать
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <CommentComponent key={comment.id} comment={comment} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar with related videos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Похожие видео</h3>
                  <div className="space-y-3">
                    {filteredVideos.filter(v => v.id !== currentVideo.id).slice(0, 8).map((video) => (
                      <Card 
                        key={video.id} 
                        className="p-3 cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => handleVideoClick(video)}
                      >
                        <div className="flex gap-3">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-24 h-14 object-cover rounded"
                            />
                            <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5">
                              {video.duration}
                            </Badge>
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-medium line-clamp-2 leading-tight">{video.title}</h4>
                            <p className="text-xs text-muted-foreground">{video.channel}</p>
                            <p className="text-xs text-muted-foreground">{video.views}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'upload' && (
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Загрузить видео</h1>
              
              <Card className="p-6 space-y-6">
                <div 
                  className="upload-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Перетащите видео сюда</h3>
                  <p className="text-muted-foreground mb-4">или выберите файл</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button variant="outline" className="youtube-button-outline">
                      Выбрать файл
                    </Button>
                  </label>
                  {uploadFile && (
                    <div className="mt-4 p-3 bg-accent rounded-lg">
                      <p className="text-sm font-medium">{uploadFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadFile.size / (1024 * 1024)).toFixed(1)} МБ
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название</label>
                    <Input placeholder="Введите название видео" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание</label>
                    <Textarea placeholder="Расскажите о вашем видео..." rows={4} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Публичное видео</label>
                    <Switch />
                  </div>
                </div>

                <Button className="w-full youtube-button">
                  <Icon name="Upload" size={20} className="mr-2" />
                  Загрузить видео
                </Button>
              </Card>
            </div>
          )}

          {currentTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-6 mb-8">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    У
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Мой Канал</h1>
                  <p className="text-muted-foreground mb-4">@mychannel • {subscriberCount} подписчиков</p>
                  <div className="flex gap-4">
                    <Button className="youtube-button">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настроить канал
                    </Button>
                    <Button variant="outline" className="youtube-button-outline">
                      <Icon name="Share" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="videos" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary">
                  <TabsTrigger value="videos">Видео</TabsTrigger>
                  <TabsTrigger value="playlists">Плейлисты</TabsTrigger>
                  <TabsTrigger value="about">О канале</TabsTrigger>
                </TabsList>

                <TabsContent value="videos" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVideos.slice(0, 3).map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="playlists" className="mt-6">
                  <div className="text-center py-12">
                    <Icon name="List" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Нет плейлистов</h3>
                    <p className="text-muted-foreground">Создайте свой первый плейлист</p>
                  </div>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <Card className="p-6 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Описание канала</h3>
                      <p className="text-muted-foreground">
                        Добро пожаловать на мой канал! Здесь вы найдете качественный контент по различным темам.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Статистика</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">15</div>
                          <div className="text-sm text-muted-foreground">Видео</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{subscriberCount}</div>
                          <div className="text-sm text-muted-foreground">Подписчиков</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">2.1M</div>
                          <div className="text-sm text-muted-foreground">Просмотров</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Настройки</h1>
              
              <div className="space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-medium">Уведомления</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Новые подписчики</p>
                        <p className="text-sm text-muted-foreground">Уведомления о новых подписчиках</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Комментарии</p>
                        <p className="text-sm text-muted-foreground">Уведомления о новых комментариях</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Лайки</p>
                        <p className="text-sm text-muted-foreground">Уведомления о лайках</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-medium">Приватность</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Приватный канал</p>
                        <p className="text-sm text-muted-foreground">Скрыть канал от поиска</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Показывать подписки</p>
                        <p className="text-sm text-muted-foreground">Другие пользователи могут видеть ваши подписки</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-medium">Аккаунт</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя пользователя</label>
                      <Input defaultValue="@mychannel" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input defaultValue="user@example.com" />
                    </div>
                    <Button className="youtube-button">
                      Сохранить изменения
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}