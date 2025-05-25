export class UserGrowth {
    constructor(
        public year: number,
        public month: number,
        public userCount: number
    ) { }
}

export class UserStatisticsDto
{
    constructor(
    public  userId:number,
    public  username:string,
    public  SongsCount:number,
    public  PlayListsCount:number
    ){}
}

export class SystemStatisticsDto
{
    constructor(
    public  totalUsers:number,
    public  totalSongs:number,
    public  totalPlayLists:number
    ){}
}