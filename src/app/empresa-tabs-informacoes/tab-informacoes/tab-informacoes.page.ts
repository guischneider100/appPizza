import { Component, OnInit } from '@angular/core';
import { ConfiguracaoServService } from 'src/app/conexao/configuracao-serv.service';
import { SugestaoService } from 'src/app/conexao/sugestao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaboresService } from 'src/app/conexao/sabores.service';

@Component({
  selector: 'app-tab-informacoes',
  templateUrl: './tab-informacoes.page.html',
  styleUrls: ['./tab-informacoes.page.scss'],
  providers: [
    ConfiguracaoServService,
    SugestaoService,
    SaboresService
  ]
})
export class TabInformacoesPage implements OnInit {

  public mostraData: boolean = false;
  tipoPesquisa = 0;
  public empresa: any;
  public cadastroForm: FormGroup;
  messageDataDe = "";
  errorDataDe = false;
  messageDataAte = "";
  errorDataAte = false;
  arrayInfos: String[];
  public infos = [];
  public infosMostrar = [];
  public infosMostrar2 = [];
  public sabores = [];
  dataIni;
  dataFim;
  sorted;
  i = 0;
  j = 0;
  k = 0;
  cont = 0;
  tipoInformacoes = 0;
  public podeGerarInformacao = false;

  constructor(public sugestaoService: SugestaoService,
    public configService: ConfiguracaoServService,
    formBuilder: FormBuilder,
    public saboresService: SaboresService) {

    this.cadastroForm = formBuilder.group({
      DataDe: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      DataAte: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
    });

    setInterval(() => {
      this.podeGerarInformacao = false;
      if (this.tipoInformacoes != 0 && this.tipoPesquisa != 0) {
        this.podeGerarInformacao = true;
      }
    }, 100);

  }

  buscarDados() {

    let { DataDe, DataAte } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid && this.tipoPesquisa != 1) {

      if (!DataDe.valid) {
        this.errorDataDe = true;
        this.messageDataDe = "Data Inicial é obrigatória"
      } else {
        this.errorDataDe = false;
        this.messageDataDe = "";
      }

      if (!DataAte.valid) {
        this.errorDataAte = true;
        this.messageDataAte = "Data Final é obrigatória"
      } else {
        this.errorDataAte = false;
        this.messageDataAte = "";
      }

    } else {

      if (this.tipoPesquisa == 2) {
        this.arrayInfos = this.cadastroForm.value.DataDe.toString().split('/');
        this.dataIni = this.arrayInfos[2] + "-" + this.arrayInfos[1] + "-" + this.arrayInfos[0]

        this.arrayInfos = [];

        this.arrayInfos = this.cadastroForm.value.DataAte.toString().split('/');
        this.dataFim = this.arrayInfos[2] + "-" + this.arrayInfos[1] + "-" + this.arrayInfos[0]
      } else if (this.tipoPesquisa == 1) {
        var now = new Date;
        if (now.getDate() < 10) {
          this.dataIni = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-0" + now.getDate().toString();
          this.dataFim = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-0" + now.getDate().toString();
        } else {
          this.dataIni = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString();
          this.dataFim = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString();
        }
      }

      let config = JSON.parse(this.configService.getConfigData());

      this.saboresService.buscarSabores(config.access_token)
        .subscribe(
          data => {
            while (this.k < Object.keys(data).length) {
              this.sabores.push({ sabCod: data[this.k].codigo, nome: data[this.k].nome });
              this.k++;
            }
          }, error => {
          }
        )

      this.sugestaoService.buscarInformacoes(this.dataIni, this.dataFim, config.access_token)
        .subscribe(
          data => {

            this.i = 0;

            while (this.i < Object.keys(data).length) {
              while (this.j < Object.keys(this.sabores).length) {
                if (data[this.i].sabor == this.sabores[this.j].sabCod) {
                  this.infos.push({ codSabor: this.sabores[this.j].sabCod, sabor: this.sabores[this.j].nome });
                  this.j++;
                } else {
                  this.j++;
                }
              }
              this.j = 0;
              this.i++;
            }

          }, error => {
          })

      var x = this.resolveAfter2Seconds(10);
    }
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {

        this.i = 0;
        this.infos.sort(function (a, b) {
          return a.codSabor < b.codSabor ? -1 : a.codSabor > b.codSabor ? 1 : 0;
        });

        while (this.i < Object.keys(this.infos).length) {
          this.infosMostrar.push({ codSabor: this.infos[this.i].sabCod, sabor: this.infos[this.i].sabor });
          this.i++;
        }

      }, 200);
    });
  }

  public mostraCamposData() {
    this.mostraData = !this.mostraData;
  }

  ngOnInit() {
    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;
  }

}
