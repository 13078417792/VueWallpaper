
export default {

    location:'tecent_location',

    hot:'/wallpaper/mobile/vertical?order=hot',

    new:'/wallpaper/mobile/vertical?order=new',

    category:'/wallpaper/mobile/category',

    // album:'/wallpaper/mobile/album',

    login:'/wallpaper/std/v1/user/login',

    logout:'/wallpaper/std/v2/user/logout',

    // 获取竖屏壁纸评论
    vertical_comment:'/wallpaper/std/v2/vertical/vertical/{$id}/comment',

    // 获取横屏壁纸评论
    horizontal_comment:'/wallpaper/std/v2/wallpaper/wallpaper/{$id}/comment',

    // 发表壁纸评论
    comment:'/wallpaper/std/v2/user/wallpaper/wallpaper/{$id}/comment',

    // 获取专辑
    album:'/wallpaper/std/v1/wallpaper/album',

    // 专辑下的壁纸
    album_wallpaper:'/wallpaper/std/v1/wallpaper/album/{$id}/wallpaper'
}