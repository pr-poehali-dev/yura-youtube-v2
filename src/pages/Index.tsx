import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
}

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'React TypeScript Tutorial - Build Modern Apps',
    thumbnail: '/img/959086c2-b7a6-411d-957d-85fc7d861b80.jpg',
    channel: 'DevMaster',
    channelAvatar: '',
    views: '2.1M просмотров',
    uploadTime: '3 дня назад',
    duration: '24:15'
  },
  {
    id: '2',
    title: 'Секреты Итальянской Кухни - Паста Карбонара',
    thumbnail: '/img/5607a143-ddeb-4189-b303-d7a7b8348473.jpg',
    channel: 'Кулинарный Мир',
    channelAvatar: '',
    views: '856K просмотров',
    uploadTime: '1 день назад',
    duration: '18:42'
  },
  {
    id: '3',
    title: 'Epic Gaming Moments - Best Highlights 2024',
    thumbnail: '/img/74b18fa9-b47a-4732-a6ae-01b1c4fb1ba6.jpg',
    channel: 'GameZone Pro',
    channelAvatar: '',
    views: '4.2M просмотров',
    uploadTime: '5 дней назад',
    duration: '31:08'
  },
  {
    id: '4',
    title: 'Создание UI/UX Дизайна с Нуля',
    thumbnail: '/img/959086c2-b7a6-411d-957d-85fc7d861b80.jpg',
    channel: 'DesignPro',
    channelAvatar: '',
    views: '1.5M просмотров',
    uploadTime: '2 недели назад',
    duration: '45:23'
  },
  {
    id: '5',
    title: 'Домашняя Выпечка - Французские Круассаны',
    thumbnail: '/img/5607a143-ddeb-4189-b303-d7a7b8348473.jpg',
    channel: 'Пекарня Дома',
    channelAvatar: '',
    views: '920K просмотров',
    uploadTime: '4 дня назад',
    duration: '22:17'
  },
  {
    id: '6',
    title: 'Cyberpunk 2077 - Новые Моды 2024',
    thumbnail: '/img/74b18fa9-b47a-4732-a6ae-01b1c4fb1ba6.jpg',
    channel: 'ModsWorld',
    channelAvatar: '',
    views: '3.1M просмотров',
    uploadTime: '1 неделю назад',
    duration: '28:54'
  }
];

export default function Index() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
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
    <Card className="video-card group">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="video-thumbnail"
        />
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1">
          {video.duration}
        </Badge>
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Menu" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Icon name="Play" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">YouTube V2</span>
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
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Video" size={24} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 relative">
              <Icon name="Bell" size={24} />
              <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-0 h-5 flex items-center">
                3
              </Badge>
            </Button>
            <Avatar className="w-8 h-8 cursor-pointer">
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
                  {['Все', 'Технологии', 'Кулинария', 'Игры', 'Музыка'].map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sampleVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {currentTab === 'subscriptions' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Подписки</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sampleVideos.slice(0, 3).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
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
                  <p className="text-muted-foreground mb-4">@mychannel • 125K подписчиков</p>
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
                    {sampleVideos.slice(0, 3).map((video) => (
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
                          <div className="text-2xl font-bold text-primary">125K</div>
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