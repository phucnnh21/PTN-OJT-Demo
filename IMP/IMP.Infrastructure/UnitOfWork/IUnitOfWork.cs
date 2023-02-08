using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Infrastructure
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        void SaveChanges();
    }
}
