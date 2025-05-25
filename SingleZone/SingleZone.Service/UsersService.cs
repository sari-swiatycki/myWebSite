using AutoMapper;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;



namespace SingleZone.Service
{
    public class UsersService : IUsersService
    {
        private readonly IPasswordHasher<Users> _passwordHasher;
        private readonly IUserRepository _userRepository;
        readonly IRepository<Users> _repository;
        readonly IMapper _mapper;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRoleRpository _rolerepository;


        //readonly IRoleRepositorycs _roleRpository;
        //readonly IUserRoleRepository _userRepository




        //public UsersService(IRepository<Users> repository, IMapper mapper)
        //{
        //    _repository = repository;
        //    _mapper = mapper;

        //}
        public UsersService(IRepository<Users> repository, IPasswordHasher<Users> passwordhasher,IMapper mapper, IUserRepository userRepository, IUserRolesRepository userRolesRepository, IRoleRpository rolerepository)
        {
            _repository = repository;
            _mapper = mapper;
            _userRepository = userRepository; // הוספת קישור ל- IUserRepository
            _userRolesRepository = userRolesRepository; // הוספת קישור ל- IUserRolesRepository
            _rolerepository = rolerepository;
            _passwordHasher = passwordhasher;


        }




        public List<UserDto> GetList()
        {
            var data = _repository.GetAll();
            return _mapper.Map<List<UserDto>>(data);
        }

        public UserDto GetById(int id)
        {
            var data = _repository.GetById(id);
            if (data == null) return null;
            return _mapper.Map<UserDto>(data);
        }

        //public UserDto AddUser(UserDto userDto)
        //{
        //    int id = _rolerepository.GetIdByRole("User");
        //    if (_repository.GetById(userDto.Id) != null)
        //    {
        //        return null;
        //    }

        //     var user = _mapper.Map<Users>(userDto);
        //     user= _repository.Add(user);
        //    //_userRolesRepository.AddAsync(new UserRoles() { RoleId = id, UserId = user.Id });
        //    if (user == null)  // בדיקה אם הוספת המשתמש נכשלה
        //    {
        //        return null;
        //    }

        //    return _mapper.Map<UserDto>(user);
        //}




    
        public async Task<UserDto> AddUserAsync(UserDto user, string password)
        {
            if (_repository.GetById(user.Id) == null)
            {
                var current = _mapper.Map<Users>(user);

                current.Password = _passwordHasher.HashPassword(current, password); // Hashing הסיסמה שהתקבלה

                current.CreatedAt = DateTime.UtcNow;
                var result = await _userRepository.AddAsync(current);

                if (result != null)
                {
                    return _mapper.Map<UserDto>(result);
                }
            }
            return null;
        }

        public async Task<UserDto> UpdateAsync(int id, UserDto userDto)
        {
            var user = _repository.GetById(id);
            if (user == null) return null;

            var updatedUser = _mapper.Map<Users>(userDto);
            updatedUser= await _repository.UpdateAsync(updatedUser, id);
            return _mapper.Map<UserDto>(updatedUser);
        }



      

        public async Task<bool> RemoveAsync(int id)
        {
            var user = _repository.GetById(id);
            if (user == null) return false;

            return await _repository.DeleteAsync(id);
        }

     



        //public async Task<string> AuthenticateAsync(string username, string password)
        //{
        //    Users user = await _userRepository.FindByUsernameAsync(username);
        //    if (user == null || !user.Password.Equals(password))
        //    {
        //        return null;
        //    }
        //    var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
        //    if (userRole == null)
        //        return null;

        //    return userRole.Role.RoleName;
        //}



        //public async Task<string> AuthenticateAsync(string username, string password)
        //{
        //    // מחפש את המשתמש עם שם המשתמש והסיסמה
        //    Users user = await _userRepository.FindByUsernameAsync(username, password);

        //    // אם לא נמצא משתמש, מחזירים null
        //    if (user == null)
        //    {
        //        Console.WriteLine($"User with username {username} not found.");
        //        return null;
        //    }

        //    // אם הסיסמה לא נכונה (לא נחוץ במקרה הזה כי אנחנו מחפשים עם הסיסמה)
        //    // אם הסיסמה לא נכונה תוכל לבדוק את זה אם תעשה השוואה ידנית כאן

        //    // מחפש את תפקיד המשתמש
        //    var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
        //    var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
        //    if (result != PasswordVerificationResult.Success)
        //    {
        //        return null;
        //    }

        //    // אם לא נמצא תפקיד או התפקיד לא מאותחל
        //    if (userRole == null || userRole.Role == null)
        //    {
        //        Console.WriteLine("User role or role is null.");
        //        return null;
        //    }

        //    // מחזיר את שם התפקיד של המשתמש
        //    return userRole.Role.RoleName;
        //}


        public async Task<string> AuthenticateAsync(string username, string password)
        {
            Console.WriteLine($"ניסיון אימות למשתמש: {username}");
           
            Users user = await _userRepository.FindByUsernameAsync(username, password);

            if (user == null)
            {
                Console.WriteLine("משתמש לא נמצא");
                return null;
            }

            Console.WriteLine($"נמצא משתמש עם מזהה: {user.Id}");
            var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            Console.WriteLine($"תוצאת אימות סיסמה: {result}");

            if (result != PasswordVerificationResult.Success)
            {
                Console.WriteLine("אימות סיסמה נכשל");
                return null;
            }

            if (userRole == null || userRole.Role == null)
            {
                Console.WriteLine("תפקיד המשתמש הוא null");
                return null;
            }

            Console.WriteLine($"האימות הצליח. תפקיד: {userRole.Role.RoleName}");
            return userRole.Role.RoleName;
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> FindByUsernameAsync(string email,string password)
        {
            var user =await _userRepository.FindByUsernameAsync(email, password);
            return _mapper.Map<UserDto>(user);
        }


        public List<UserGrowthDTO> GetUserGrowthByMonth()
        {
            var result = GetList()
                .GroupBy(u => new { Year = u.CreatedAt.Year, Month = u.CreatedAt.Month })
                .Select(g => new UserGrowthDTO
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    UserCount = g.Count()
                })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToList();

            return result;
        }


    }
}
