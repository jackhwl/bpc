import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';

import { UserService } from '../core/services';
import { BlogAdminService } from './adminShared/blog-admin.service';
import { MenuAdminService } from './adminShared/menu-admin.service';

import { BlogAdminComponent } from './blogAdmin/blog-admin.component';
import { BlogAddComponent } from './blogAdd/blog-add.component';

import { MenuAdminComponent } from './menuAdmin/menu-admin.component';
import { MenuAddComponent } from './menuAdd/menu-add.component';
import { MenuEditComponent } from './menuEdit/menu-edit.component';
import { SubMenuAdminComponent } from './subMenuAdmin/sub-menu-admin.component';

import { TruncatePipe } from './adminShared/trunc.pipe';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
            { path: 'menu-admin', component: MenuAdminComponent, canActivate: [UserService] },
            { path: 'sub-menu-admin', component: SubMenuAdminComponent, canActivate: [UserService] },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignUpComponent,
        BlogAdminComponent,
        BlogAddComponent,
        MenuAdminComponent,
        MenuAddComponent,
        MenuEditComponent,
        SubMenuAdminComponent,
        TruncatePipe
    ],
    providers: [
        UserService,
        BlogAdminService,
        MenuAdminService
    ]
})
export class AdminModule {}
