import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [AppComponent, DialogComponent, BarChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    InputSwitchModule,
    MatSelectModule,
    MatFormFieldModule,
    AvatarModule,
    TooltipModule,
    DialogModule,
    OverlayPanelModule,
    ButtonModule,
    ToggleButtonModule,
    PlotlyModule,
    CommonModule,
    PlotlyViaCDNModule,
    PlotlyViaWindowModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
