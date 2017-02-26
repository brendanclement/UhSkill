module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**", "!dist/**", "!bin/**"],
        tsconfig: "tsconfig.json"
      }
    },
    copy: {
      node_modules: {
        files: [
          { expand: true, 
            src: ['node_modules/**', 'package.json', 'stories/**',
                  '!node_modules/typescript/**',
                  '!grunt*/**'], 
            dest: 'dist/' }
        ]
      }
    },
    lambda_package: {
        default: {
            options: {
                dist_folder: 'bin',
                package_folder: 'dist'
            }
        }
    },
    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:us-east-1:226285643949:function:WordBlanksSkill',
            options: {
                // Task-specific options go here.
            }
        }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-aws-lambda');
  grunt.registerTask("default", ["ts", 'copy:node_modules', 'lambda_package', 'lambda_deploy']);
  grunt.registerTask("build", ["ts"]);
};