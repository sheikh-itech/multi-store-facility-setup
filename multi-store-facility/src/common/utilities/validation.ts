import { Login } from "../beans/login";
import { Product } from "../beans/product";
import { Register } from "../beans/register";

export class Validation {

    public static validate(login: Login): boolean {

        if (!login)
            return false;

        if (!login.username || login.username.length < 1)
            return false;

        if (!login.password || login.password.length < 1)
            return false;

        return true;
    }

    public static validRegister(user: Register): string {

        if (!user.firstName || user.firstName.length < 1)
            return 'First Name Required';

        if (!user.lastName || user.lastName.length < 1)
            return 'Last Name Required';
        if (!user.mobile || user.mobile.toString().length < 10)
            return "Mobile don't have 10 digits";
        if (!user.password || user.password.length < 5)
            return 'Password of length 5 required';
        if (!user.dob || user.dob.length < 10)
            return 'Invalid birth date';

        return 'OK';
    }

    public static validProduct(product: Product): string {

        if (!product.name || product.name.length < 3)
            return 'Name shoud have 3 alphabet';

        if (!product.price || product.price <= 0)
            return 'Price should be more then 0';
        if (!product.category || product.category.length <= 0)
            return 'Category not provided';

        if (!product.detail.brand || product.detail.brand.length < 2)
            return 'Product brand required';

        if (!product.detail.dietType)
            return 'Product diet type required';

        if (!product.detail.weight && !product.detail.weightUnit)
            return 'Product weight and unit required';

        if (product.detail.info) {
            let infos = product.detail.info.toString().split(',');
            product.detail.info = [];
            infos.forEach(info => {
                info = info.replaceAll('\n', ' ').trim();
                info = info.replaceAll('\\', ' ').trim();
                product.detail.info?.push(info);
            })
        }

        return 'OK';
    }
}