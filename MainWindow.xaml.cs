using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using YamlDotNet.Serialization.NamingConventions;
using YamlDotNet.Serialization;
using System.IO;
using ReadmeGenerator.Models;
using System.Xml.Linq;
using ReadmeGenerator.Services;

namespace ReadmeGenerator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly string vpsUrl = @"https://virtualpinballspreadsheet.github.io/vps-db/db/vpsdb.json";

        private readonly IDeserializer _deserializer;
        private string _ymlFile;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Create OpenFileDialog 
            Microsoft.Win32.OpenFileDialog dlg = new Microsoft.Win32.OpenFileDialog();

            // Set filter for file extension and default file extension 
            dlg.DefaultExt = ".yml";
            dlg.Filter = "YML Files (*.yml)|*.yml";

            // Display OpenFileDialog by calling ShowDialog method 
            Nullable<bool> result = dlg.ShowDialog();

            // Get the selected file name and display in a TextBox 
            if (result == true)
            {
                // Open document 
                string filename = dlg.FileName;
                fileLabel.Text = filename;
                _ymlFile = filename;
            }
        }

        private async void wiz_gen_Click(object sender, RoutedEventArgs e)
        {
            if (!File.Exists(_ymlFile))
                throw new FileNotFoundException($"YAML file not found: {_ymlFile}");

            var readmeService = new ReadmeService();
            var (succ, message) = await readmeService.GenerateWizardReadme(_ymlFile, vpsUrl, includePreview.IsChecked ?? true);

            if (!succ)
            {
                finishedLabel.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FFFF0B84"));
                finishedLabel.Text = message;
                return;
            }
            else
            {
                finishedLabel.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FFFF0BDE"));
                finishedLabel.Text = message;
            }
        }

        private async void man_gen_Click(object sender, RoutedEventArgs e)
        {
            if (!File.Exists(_ymlFile))
                throw new FileNotFoundException($"YAML file not found: {_ymlFile}");

            var readmeService = new ReadmeService();
            var (succ, message) = await readmeService.GenerateManualReadme(_ymlFile, vpsUrl, includePreview.IsChecked ?? true);

            if (!succ)
            {
                finishedLabel.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FFFF0B84"));
                finishedLabel.Text = message;
                return;
            }
            else
            {
                finishedLabel.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FFFF0BDE"));
                finishedLabel.Text = message;
            }
        }

    }
}